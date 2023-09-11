const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>Habits of highly successful people</h2>
        <p className="info">
          <a href="" className="author">
            Jessej Samuel
          </a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          There is a famous saying that “habits can either help or hurt your
          success in life.” Ever wondered why getting ahead can sometimes seem
          like such a struggle? To become successful in life, you need to be
          highly motivated and disciplined, which takes hard work.
        </p>
      </div>
    </div>
  );
};

export default Post;
