import React from "react";

import renderer from "react-test-renderer";
import SearchResults from "../src/SearchResults";

const post = { permalink: "https://kb.yoast.com/kb/passive-voice/", postTitle: "Post Title", objectID: 1 };

test( "the SearchResults component with results matches the snapshot", () => {
	const component = renderer.create(
		<SearchResults
			onClick={ () => {} }
			post={ post }
			showDetail={ () => {} }
			searchString="Test"
			results={ [ post ] }
			noResultsText="No Results"
			foundResultsText="These are your %d results"
		/>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the SearchResults component without results matches the snapshot", () => {
	const component = renderer.create(
		<SearchResults
			onClick={ () => {} }
			post={ {} }
			showDetail={ () => {} }
			searchString="Test"
			results={ [] }
			noResultsText="No Results"
			foundResultsText="These are your %d results"
		/>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
