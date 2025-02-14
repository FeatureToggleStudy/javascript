import LeafNode from "./LeafNode";

/**
 * A header in a document.
 *
 * @extends module:parsedPaper/structure.LeafNode
 *
 * @memberOf module:parsedPaper/structure
 */
class Heading extends LeafNode {
	/**
	 * Makes a new header object.
	 *
	 * @param {number} level The header level (e.g. 1 for main heading, 2 for subheading lvl 2, etc.)
	 */
	constructor( level ) {
		super( "Heading" );
		/**
		 * Heading's level (e.g. 1 for "h1", 2 for "h2", ... ).
		 * @type {number}
		 */
		this.level = level;
	}
}
export default Heading;
