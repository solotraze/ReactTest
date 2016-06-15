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
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        Comment List follows.
        {commentNodes}
      </div>
    );
  }
});
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <div className="commentBox">
        Hello, {this.props.guest}!
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox guest="solo" url="/api/comments"/>,
  document.getElementById('content')
);
