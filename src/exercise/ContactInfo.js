import React, { Component } from 'react';

export default class ExerInfo extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.exer.name}</div>   // onClick 을 Props로 받음
        );
    }
}