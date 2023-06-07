import { LightningElement, api, track, wire } from 'lwc';
import getUserDetails from '@salesforce/apex/UserServices.getUserDetails';


export default class UserStoryForm extends LightningElement {
    @track userType;
    @track action;
    @track description;
    @track acceptanceCriteriaList = [];
    @track expectedOutcomes;
    
    @api pageReference;
    
    userStoryDetails;

    async connectedCallback() {
        try {
            this.userStoryDetails = await getUserDetails();
            this.userStoryDetails.userLocation = window.location.href;
            console.log('User Story Details: ', this.userStoryDetails);
        } catch (error) {
            // Handle the error
        }
    }

    userTypeOptions = [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' }
    ];

    get showAddButton() {
        return this.acceptanceCriteriaList.length === 0;
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    handleUserTypeChange(event) {
        this.userType = event.detail.value;
    }

    handleAcceptanceCriteriaChange(event) {
        const index = event.target.dataset.index;
        this.acceptanceCriteriaList[index] = event.target.value;
        this.acceptanceCriteriaList = [...this.acceptanceCriteriaList];
    }

    handleAddAcceptanceCriteria(event) {
        const index = event.target.dataset.index;
        this.acceptanceCriteriaList.splice(index + 1, 0, '');
        this.acceptanceCriteriaList = [...this.acceptanceCriteriaList];
    }


    handleRemoveAcceptanceCriteria(event) {
        const index = event.target.dataset.index;
        this.acceptanceCriteriaList.splice(index, 1);
        this.acceptanceCriteriaList = [...this.acceptanceCriteriaList];
    }

    saveUserStory() {
        const userStory = {
            userType: this.userType,
            action: this.action,
            description: this.description,
            acceptanceCriteria: this.acceptanceCriteriaList,
            expectedOutcomes: this.expectedOutcomes.split('\n')
        };

        // Perform further processing or API call to save the user story
        console.log(userStory);
    }
}