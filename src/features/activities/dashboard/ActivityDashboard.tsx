import React, { FC, MouseEvent } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | null;
  handleSelectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
  handleDeleteActivity: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  isSubmitting: boolean;
  target: string;
}
const ActivityDashboard: FC<IProps> = ({
  activities,
  selectedActivity,
  handleSelectActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleCreateActivity,
  handleEditActivity,
  handleDeleteActivity,
  isSubmitting,
  target
}) => {
  return (
    <Container style={{ marginTop: '7em' }}>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            handleSelectActivity={handleSelectActivity}
            handleDeleteActivity={handleDeleteActivity}
            isSubmitting={isSubmitting}
            target={target}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              selectedActivity={selectedActivity}
              setEditMode={setEditMode}
              setSelectedActivity={setSelectedActivity}
            />
          )}
          {editMode && (
            <ActivityForm
              setEditMode={setEditMode}
              selectedActivity={selectedActivity}
              handleCreateActivity={handleCreateActivity}
              handleEditActivity={handleEditActivity}
              isSubmitting={isSubmitting}
              key={(selectedActivity && selectedActivity.id) || 0}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ActivityDashboard;
