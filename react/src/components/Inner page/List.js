const List = ({cookies, setLogedIn}) => {
    const logOut = () => {
        cookies.remove("token")
        setLogedIn(false)
    }
    return <>
        <button onClick={logOut}>Log out</button>
    </>
}

export default List