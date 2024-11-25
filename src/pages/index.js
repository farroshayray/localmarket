// pages/index.js
import { useMyContext } from '../src/context/MyContext';

const Home = () => {
    const { state, setState } = useMyContext();

    const handleLogin = () => {
        setState({ user: { name: 'John Doe' } });
    };

    return (
        <div>
            <h1>Welcome {state.user ? state.user.name : 'Guest'}</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Home;
