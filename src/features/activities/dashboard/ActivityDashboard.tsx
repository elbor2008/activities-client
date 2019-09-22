import React, { FC, useContext } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityDashboard: FC = () => {
  const { editMode, selectedActivity } = useContext(ActivityStore);
  return (
    <Container style={{ marginTop: '7em' }}>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && <ActivityDetails />}
          {editMode && (
            <ActivityForm
              key={(selectedActivity && selectedActivity.id) || 0}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default observer(ActivityDashboard);
