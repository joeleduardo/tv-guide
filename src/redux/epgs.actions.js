import axios from 'axios';

export const GET_EPGS = 'GET_EPGS';
const setEpgs = data => (
  {
    type: GET_EPGS,
    epgs: data
  }
);

export const getEpgs = () => (
  dispatch => (
    axios.get(`${API_URL}/epg`).then(({data}) => {
      dispatch(setEpgs(data))
    })
  )
)