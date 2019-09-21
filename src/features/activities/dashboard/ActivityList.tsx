import React, { FC, MouseEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  isSubmitting: boolean;
  target: string;
}
const ActivityList: FC<IProps> = ({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
  isSubmitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => handleSelectActivity(activity.id)}
                  content="View"
                  color="blue"
                  floated="right"
                />
                <Button
                  name={activity.id}
                  loading={isSubmitting && target === activity.id}
                  onClick={e => handleDeleteActivity(e, activity.id)}
                  content="Delete"
                  color="red"
                  floated="right"
                />
                <Label content={activity.category} basic></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
