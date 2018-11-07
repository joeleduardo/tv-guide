import { connect } from 'react-redux';
import HomeComponent from './Home';
import * as EPGS_ACTIONS from '../redux/epgs.actions';

const mapStateToProps = state => (
  {
    epgs: state.epgsReducer.epgs
  }
);

const mapDispatchToProps = dispatch => (
  {
    getEpgs: () => {
      dispatch(EPGS_ACTIONS.getEpgs());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
