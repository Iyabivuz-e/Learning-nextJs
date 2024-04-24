const UserProfile = ({params}: any) => {
  return (
    <div className="flex flex-col p-3 justify-center align-center">
      <h1>User Profile</h1>
      <br />
      <h1>User Id is "{params.id}"</h1>
    </div>
  );
};

export default UserProfile;
