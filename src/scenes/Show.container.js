import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShowComponent from './Show';
import * as SHOW_ACTIONS from '../redux/show.actions';

const mapStateToProps = state => (
  {
    show: state.showReducer.show
  }
);

const mapDispatchToProps = dispatch => (
  {
    getShow: (param) => {
      dispatch(SHOW_ACTIONS.getShow(param));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowComponent));