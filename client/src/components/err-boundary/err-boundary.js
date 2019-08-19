import React, { Component } from 'react';
import ErrIndicator from '../error-handler';

export default class ErrBoundary extends Component {
    state = {
         hasErr: false
    };

    componentDidCatch() {
        this.setState({ hasErr: true });
    };

    render() {
        if(this.state.hasErr) {
            return <ErrIndicator />
        }

        return this.props.children;
    };

};

