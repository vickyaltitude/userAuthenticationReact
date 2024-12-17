import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = ({userToken}) => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm userToken={userToken} />
    </section>
  );
};

export default UserProfile;
