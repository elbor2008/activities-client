import React, { FC } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}
const ActivityList: FC<IProps> = ({
  activities,
  handleSelectActivity,
  handleDeleteActivity
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
                  onClick={() => handleDeleteActivity(activity.id)}
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
