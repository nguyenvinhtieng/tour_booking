import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Đi thả ga, không ngại giá!</h1>
      <span className="mailDesc">Đăng ký thành viên ngay để không bỏ lỡ các khuyến mãi mới nhất!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Theo dõi</button>
      </div>
    </div>
  )
}

export default MailList