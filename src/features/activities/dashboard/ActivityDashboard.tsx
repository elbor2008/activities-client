import React, { FC, useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import Loading from '../../../app/layout/Loading';

const ActivityDashboard: FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect((): void => {
    activityStore.loadActivities();
    console.log('initial');
  }, [activityStore]);
  if (activityStore.isLoading) {
    return <Loading />;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>activity filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
