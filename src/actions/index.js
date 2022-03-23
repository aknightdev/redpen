export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const getChannel = channel => ({
  type: SELECT_CHANNEL,
  channel,
});
export const requestPosts = () => ({
  type: REQUEST_POSTS,
});
export const receivedPosts = json => ({
  type: RECEIVE_POSTS,
  json: json.articles,
});
export function fetchPosts(channel) {
 return function (dispatch) {
   dispatch(requestPosts());
   return fetch(`http://157.230.202.118/api/projects`,{})
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((json) => {
      dispatch(receivedPosts(json));
   },
  );
 };
}