import axios from 'axios';

export const GET_SHOW = 'GET_SHOW';
const setShow = data => (
  {
    type: GET_SHOW,
    show: data
  }
);

export const getShow = (param) => (
  dispatch => (
    axios.get(`${API_URL}/program/${param}`).then(({data}) => {
      dispatch(setShow(data))
    })
  )
)