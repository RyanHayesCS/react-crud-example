import React from 'react';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm  /* redux forms uses intialValues prop to find passed fields to render onto form */
                    initialValues={_.pick(this.props.stream, 'title', 'description')} /* _.pick searches dom object for specified form values and pulls them  */
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);