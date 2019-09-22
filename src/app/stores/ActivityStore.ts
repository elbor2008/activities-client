import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, MouseEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'observed' });

class ActivityStore {
  @observable activitiesMap = new Map<string, IActivity>();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable isLoading = false;
  @observable editMode = false;
  @observable isSubmitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activitiesMap.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.isLoading = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          this.activitiesMap.set(activity.id, activity);
        });
        this.activities = activities;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction('loading activities error', () => {
        console.log(error);
        this.isLoading = false;
      });
    }
  };
  @action setActivity = (id: string): void => {
    this.selectedActivity = this.activitiesMap.get(id);
    this.editMode = false;
  };
  @action cancelForm = (): void => {
    this.selectedActivity = undefined;
  };
  @action setEditMode = (editMode: boolean): void => {
    this.editMode = editMode;
  };
  @action openForm = (): void => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };
  @action createActivity = async (activity: IActivity) => {
    this.isSubmitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('creating activity', () => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.isSubmitting = false;
      });
    } catch (error) {
      runInAction('creating activity error', () => {
        this.isSubmitting = false;
        console.log(error);
      });
    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.isSubmitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.isSubmitting = false;
      });
    } catch (error) {
      runInAction('editing activity error', () => {
        this.isSubmitting = false;
        console.log(error);
      });
    }
  };
  @action deleteActivity = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const { name } = e.currentTarget;
    this.target = name;
    this.isSubmitting = true;
    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity', () => {
        this.activitiesMap.delete(id);
        this.selectedActivity = undefined;
        this.isSubmitting = false;
      });
    } catch (error) {
      runInAction('deleting activity error', () => {
        this.isSubmitting = false;
        console.log(error);
      });
    }
  };
}

export default createContext(new ActivityStore());
