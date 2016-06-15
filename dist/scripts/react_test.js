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
    return (
      <div className="commentList">
        Hello, {this.props.guest}! Comment List follows.
        <Comment author="user one">This is the first comment.</Comment>
        <Comment author="user two">This is the second comment.</Comment>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentList guest="solo"/>,
  document.getElementById('content')
);
