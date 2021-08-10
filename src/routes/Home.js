import React from "react";

const Home = () => <div>
    <form>
        <input type ="text" placeholder="무슨 일이 일어나고 있나요?" maxLength={120}/>
        <input type ="submit" value ="Nweet" />
    </form>
</div>;
export default Home;