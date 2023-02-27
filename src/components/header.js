
const Title =() =>(
    <a href="/">
    <img 
    className="logo" alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUUBlxXzH75HmYKm-tUQYwAMjvhq3DK7-M04V4zJItzO8KT7abU32Ax4ninZtjxuX-esI&usqp=CAU" />
    </a>
   
)

const Header = () =>{
    return(
        <div className="header">
            <Title />   
            <div className="nav_items">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

 export default Header;