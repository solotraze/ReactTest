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
        <Comment author={comment.authorName} key={comment.id}>
          {comment.content}
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
var CommentForm = React.createClass({
  getInitialState: function() {
    return { authorName: '', content: ''};
  },
  onAuthorNameChange: function(e) {
    this.setState ({authorName: e.target.value });
  },
  onContentChange: function (e) {
    this.setState({content: e.target.value });
  },
  onSubmit: function(e) {
    e.preventDefault();
    var authorName = this.state.authorName.trim();
    var content = this.state.content.trim();
    if (!authorName || !content) {
      return;
    }

    // TODO: post to server
    this.props.onCommentSubmit({authorName: authorName, content: content });

    this.setState({authorName:'', content:'' });
  },
  render: function() {
    return (
        <form className="commentForm" onSubmit={this.onSubmit} >
          <input id="txtAuthorName" type="text"  placeholder="your name..."
            onChange={this.onAuthorNameChange} value={this.state.authorName} />
          <input id="txtContent" type="text" placeholder="your comment..."
            onChange={this.onContentChange} value={this.state.content} />
          <input type="submit" value="Post Comment" />
        </form>
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
  onCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.commentsUrl,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        //?? this.setState({data: data});
        this.loadCommentsFromServer();
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
      <CommentForm onCommentSubmit={this.onCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox uprofileUrl="/api/users" commentsUrl="/api/comments" pollInterval="5000" />,
  document.getElementById('content')
);
