public class UserServices {
    public class UserDetails {
        @AuraEnabled
        public String appName;
        @AuraEnabled
        public User userDetails;
        
        public UserDetails(String appName, User userDetails) {
            this.appName = appName;
            this.userDetails = userDetails;
        }
    }
    
    @AuraEnabled
    public static UserDetails getUserDetails() {
        UserAppInfo userAppInfo = [SELECT Id, AppDefinitionId FROM UserAppInfo WHERE UserId = :UserInfo.getUserId() LIMIT 1];
        AppDefinition appDefinition = [SELECT DurableId, Label FROM AppDefinition Where DurableId = :userAppInfo.AppDefinitionId LIMIT 1];
        String appName = appDefinition.Label;
        
        User userDetails = [SELECT Id, Name, Username, Email, Profile.Name, IsActive, LastLoginDate, CreatedDate FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        
        UserDetails result = new UserDetails(appName, userDetails);
        return result;
    }
}