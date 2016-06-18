var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
      {this.props.author}: {this.props.children}
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.commentsList.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        Comment List follows (Last Updated: {this.props.lastUpdated})
        {commentNodes}
      </div>
    );
  }
});
var CommentBox = React.createClass({
  loadUserProfileFromServer: function() {
    $.ajax({
      url: this.props.uprofileUrl,
      dataType: 'json',
      cache: false,
      success: function(returnObj) {
        this.state.userFullName = returnObj.userFullName;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.uprofileUrl, status, err.toString());
      }.bind(this)
    });
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.commentsUrl,
      dataType: 'json',
      cache: false,
      success: function(returnObj) {
        this.setState({commentsList: returnObj.commentsList, lastUpdated: returnObj.lastUpdated});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {commentsList: [], lastUpdated: ''};
  },
  componentDidMount: function() {
    this.loadUserProfileFromServer();
    this.loadCommentsFromServer();
    // Keep comments list refreshed
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        Hello, {this.state.userFullName}!
      <CommentList commentsList={this.state.commentsList} lastUpdated={this.state.lastUpdated} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox uprofileUrl="/api/users" commentsUrl="/api/comments" pollInterval="3000" />,
  document.getElementById('content')
);
