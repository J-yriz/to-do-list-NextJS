const Home = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <h1>Home {params.userId}</h1>
    </div>
  );
};

export default Home;
