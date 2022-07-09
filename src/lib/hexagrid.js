export const EAST = 1;
export const NORTHEAST = 2;
export const NORTHWEST = 4;
export const WEST = 8;
export const SOUTHWEST = 16;
export const SOUTHEAST = 32;

export const YSTEP = Math.sqrt(3) / 2;

export const DIRECTIONS = [EAST, NORTHEAST, NORTHWEST, WEST, SOUTHWEST, SOUTHEAST];

export const OPPOSITE = new Map([
	[NORTHEAST, SOUTHWEST],
	[SOUTHWEST, NORTHEAST],
	[EAST, WEST],
	[WEST, EAST],
	[NORTHWEST, SOUTHEAST],
	[SOUTHEAST, NORTHWEST]
]);

export const XY_DELTAS = new Map([
	[EAST, [1, 0]],
	[WEST, [-1, 0]],
	[NORTHEAST, [0.5, YSTEP]],
	[NORTHWEST, [-0.5, YSTEP]],
	[SOUTHEAST, [0.5, -YSTEP]],
	[SOUTHWEST, [-0.5, -YSTEP]]
]);

/**
 * @param {Number} width
 * @param {Number} height
 */
export function HexaGrid(width, height) {
	let self = this;

	this.width = width;
	this.height = height;
	this.total = width * height;

	this.RC_DELTA = new Map([
		[
			EAST,
			[
				[0, 1],
				[0, 1]
			]
		],
		[
			NORTHEAST,
			[
				[-1, 0],
				[-1, 1]
			]
		],
		[
			NORTHWEST,
			[
				[-1, -1],
				[-1, 0]
			]
		],
		[
			WEST,
			[
				[0, -1],
				[0, -1]
			]
		],
		[
			SOUTHWEST,
			[
				[1, -1],
				[1, 0]
			]
		],
		[
			SOUTHEAST,
			[
				[1, 0],
				[1, 1]
			]
		]
	]);

	/**
	 * @param {Number} index
	 */
	this.index_to_xy = function (index) {
		let q = 2 * self.width;
		let a = index % q;
		let b = (index - a) / q;
		let x, y;
		if (a < self.width) {
			x = a;
			y = YSTEP * (self.height - 1 - 2 * b);
		} else {
			x = a - self.width + 0.5;
			y = YSTEP * (self.height - 2 - 2 * b);
		}
		return [x, y];
	};
	/**
	 * @param {Number} index
	 * @param {Number} direction
	 */
	this.find_neighbour = function (index, direction) {
		let c = index % self.width;
		let r = (index - c) / self.width;

		const [dr, dc] = self.RC_DELTA.get(direction)[r % 2];
		r += dr;
		c += dc;
		if (r < 0 || r >= self.height) {
			return -1;
		}
		if (c < 0 || c >= self.width) {
			return -1;
		}
		return self.width * r + c;
	};

	this.rotate = function(tile, rotations) {
		let rotated = tile
		while (rotations < 0) {
			rotations += 6
		}
		while (rotations > 0) {
			rotated = (rotated*2) % 64 + Math.floor(rotated/32)
			rotations -= 1
		}
		return rotated
	}

	this.getDirections = function (tile, rotations=0) {
		const rotated = self.rotate(tile, rotations)
		return DIRECTIONS.filter((direction) => (direction & rotated) > 0);
	};

	this.tilePath = '';
	for (let p = 0; p < 6; p++) {
		const angle = (Math.PI * (2 * p + 1)) / 6;
		const dx = (0.49 * Math.cos(angle)) / YSTEP;
		const dy = (-0.49 * Math.sin(angle)) / YSTEP;
		if (this.tilePath === '') {
			this.tilePath += ` m ${dx - 0.49} ${dy + 0.98*YSTEP}`;
		}
		this.tilePath += ` l ${dx} ${dy}`;
	}
	this.tilePath += ' z';
	return this;
}
