import React, { FC, useState, FormEvent, useContext } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityForm: FC = () => {
  const {
    selectedActivity,
    setEditMode,
    createActivity,
    isSubmitting,
    editActivity
  } = useContext(ActivityStore);
  const initialActivity = (): IActivity =>
    selectedActivity
      ? { ...selectedActivity }
      : {
          id: '',
          title: '',
          description: '',
          category: '',
          date: '',
          city: '',
          venue: ''
        };
  const [activity, setActivity] = useState<IActivity>(initialActivity);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = (): void => {
    if (!activity.id) {
      activity.id = uuidv4();
      createActivity(activity);
    } else {
      editActivity(activity);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={isSubmitting}
          floated="right"
          type="submit"
          positive
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
