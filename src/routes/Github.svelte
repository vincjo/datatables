<header>
  <div>
    <a href="https://github.com/vincjo/datatables">
      <img alt="github logo" src="/datatables/github.svg" /><span>Github</span>
    </a>
  </div>
</header>

<style>
  header {
    font-weight: 300;
    padding: 0;
    height: 40px;
    position: fixed;
    top: 4px;
    right: 8px;
    z-index: 200;
    color: #212121;
  }
  header a {
    text-decoration: none;
    padding: 0;
    display: block;
    font-size: 16px;
    line-height: 40px;
  }
  div {
    display: flex;
    margin-right: 16px;
    float: right;
    text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1), 1px 1px 1px rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
  }
  img {
    float: left;
    padding: 8px 8px;
    width: 40px;
  }
  span {
    padding-right: 8px;
  }
  @media (max-width: 800px) {
    header {
      position: absolute;
    }
  }
</style>
