import React from 'react';
import SearchBar from '../containers/searchbar/searchbar';
import FaqWrapper from '../containers/faqwrapper/FaqWrapper';

export default class FAQ extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            faqItems : [],
            searchedItems: []

        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {

        let searchedValue = e.target.value.toLowerCase();
        let newSearchedItems = this.state.faqItems.filter( (item) => {

            let checkedTags = item.tags.filter( item => {

                return item.indexOf(searchedValue) !== -1;

            } );
            return (item.title.toLowerCase().indexOf(searchedValue) !== -1 || item.text.toLowerCase().indexOf(searchedValue) !== -1 || Boolean(checkedTags.length))

        } );

        this.setState({
            searchedItems: newSearchedItems
        });

    };

    componentDidMount() {

        fetch(' https://reportservice.mawihealth.com/faq/')
            .then(res => res.json())
            .then(result => this.setState({
                faqItems : result,
                searchedItems : result
            }))

    }


    render() {

        return(
            <React.Fragment>
                <SearchBar handleSearch = { this.handleSearch }/>
                {this.state.searchedItems.length > 0 ? <FaqWrapper faqItems={this.state.searchedItems}/> : null}
            </React.Fragment>
        )

    }

}