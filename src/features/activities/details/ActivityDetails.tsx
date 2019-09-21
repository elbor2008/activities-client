import React, { FC } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  selectedActivity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
const ActivityDetails: FC<IProps> = ({
  selectedActivity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>{selectedActivity.date}</Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => setEditMode(true)} basic color="blue">
            Edit
          </Button>
          <Button onClick={() => setSelectedActivity(null)} basic color="grey">
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
