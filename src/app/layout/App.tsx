import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Loading from './Loading';
import ActivityStore from '../stores/ActivityStore';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect((): void => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <NavBar />
      <ActivityDashboard />
    </Fragment>
  );
};

export default observer(App);
