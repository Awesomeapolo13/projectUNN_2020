'use strict'

import React from 'react'

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const pages = this.props.pages;

        return (
            <div className={'topMenu'}>
                <ul>
                    {li}
                </ul>
            </div>
        );
    }
}