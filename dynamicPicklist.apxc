public class dynamicPicklist {
    @AuraEnabled
    public static List <String> getselectOptions() {
        List <String> allOpts = new list <String> ();
        
        String alpha = label.Tracking_Analytics_Admin_Setting;
        List<String> lstAlpha = alpha.split(',');
        for(String str:lstAlpha){
            allOpts.add(str);
        }
        allOpts.sort(); 
        system.debug('allOpts > ' + allOpts);
        return allOpts;
    }
    @AuraEnabled
    public static List<String> getPicklistFields(String sobjectValue) {
        System.debug('sobjectValue > ' + sobjectValue);
        List<String> listobjvalues=new List<String>();
        sObjectType objType1 = Schema.getGlobalDescribe().get(sobjectValue);
        Map<String,Schema.SObjectField> mfields = objType1.getDescribe().fields.getMap();
        
        System.debug(label.Tracking_Analytics_Admin_Setting);
        
        for(String key : mfields.keySet()){
            String sobjectname = sobjectValue; //object api name
            String fieldapiName = key; //Field api name
            String fieldTypeName = Schema.getGlobalDescribe().get(sobjectname).getDescribe().fields.getMap().get(fieldApiName).getDescribe().getType().name().toupperCase(); 
            if(fieldTypeName=='Picklist'){
                listobjvalues.add(key);
                System.debug('*** fieldTypeName = ' + key);  //field type came
            }
        }
        System.debug('listobjvalues > ' + listobjvalues);
        return listobjvalues;
    }
    @AuraEnabled
    public static String[] picklistValues(String object_name, String field_name) {     
        System.debug('object_name > ' + object_name);
        String[] values = new String[]{};
            if(object_name <> null){
                List<TrackingAnalytics__c> listTrack = [SELECT Id, Selected_Values__c FROM TrackingAnalytics__c WHERE Name=:object_name+'-'+field_name];   
                String[] types = new String[]{object_name};
                    Schema.DescribeSobjectResult[] results = Schema.describeSObjects(types);
                for(Schema.DescribeSobjectResult res : results) {
                    for (Schema.PicklistEntry entry : res.fields.getMap().get(field_name).getDescribe().getPicklistValues()) {
                        if (entry.isActive()) {values.add(entry.getValue());}
                    }
                }
                System.debug(values);
            }
        return values;
    }
    
    @AuraEnabled
    public static String[] getAlreadySelected(String object_name, String field_name)
    {
        System.debug('object_name > ' + object_name);
        String[] values = new String[]{};
            if(object_name <> null){
                List<TrackingAnalytics__c> listTrack = [SELECT Id, Selected_Values__c FROM TrackingAnalytics__c WHERE Name=:object_name+'-'+field_name];
                for(TrackingAnalytics__c tcc:listTrack){
                    values.add(tcc.Selected_Values__c);
                    System.debug('selected values  :'+values);
                }
            }
        return values;
    }
    
    @AuraEnabled
    public static String saveData(String objectVal, String fieldVal, String allVals) {
        System.debug('savedata Invoked!');
        
        try{
            System.debug('Entered '+objectVal+': er  :'+fieldVal+': er  :'+allVals);
            TrackingAnalytics__c track = new TrackingAnalytics__c();
            track.Name=objectVal+'-'+fieldVal;
            track.sObject_Name__c=objectVal;
            track.sObject_API_Name__c=objectVal;
            track.Picklist_API_Name__c=fieldVal;
            track.Selected_Values__c=allVals;
            insert track;
            return 'Record Created';
        }catch(Exception ex){
            System.debug('Exception - ' + ex.getMessage());
            throw new AuraHandledException('Error > ' + ex.getMessage() + 'at line ' + ex.getLineNumber());
        }
    }
    
    
    @AuraEnabled
    public static String updateData(String objectVal, String fieldVal, String allVals) {
        System.debug('savedata Invoked!');
        
        try{
            List<TrackingAnalytics__c> listTrack = [SELECT Id FROM TrackingAnalytics__c WHERE Name=:objectVal+'-'+fieldVal];
            for(TrackingAnalytics__c tcc:listTrack){   
                System.debug('Entered '+objectVal+': er  :'+fieldVal+': er  :'+allVals);
                TrackingAnalytics__c track = new TrackingAnalytics__c();
                track.Id=tcc.Id;
                track.Name=objectVal+'-'+fieldVal;
                track.sObject_Name__c=objectVal;
                track.sObject_API_Name__c=objectVal;
                track.Picklist_API_Name__c=fieldVal;
                track.Selected_Values__c=allVals;
                update track;
                
            }
             return 'Record Created';
        }catch(Exception ex){
            System.debug('Exception - ' + ex.getMessage());
            throw new AuraHandledException('Error > ' + ex.getMessage() + 'at line ' + ex.getLineNumber());
        }
    }
    
    
    @AuraEnabled
    public static List<TrackingAnalytics__c> getAllValues() { 
        return [Select Name,sObject_Name__c,sObject_API_Name__c,Selected_Values__c,Picklist_API_Name__c	 FROM TrackingAnalytics__c];    
    }
    
    @AuraEnabled
    public static List<TrackingAnalytics__c> getByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [SELECT Name,sObject_Name__c,sObject_API_Name__c,Selected_Values__c,Picklist_API_Name__c FROM TrackingAnalytics__c WHERE name LIKE :name];
    }
    
    @AuraEnabled
    public static void deleteTrackingAnalytics(String name){
        List<TrackingAnalytics__c> accountList = [SELECT Id FROM TrackingAnalytics__c WHERE name=:name];
        DELETE accountList;
    }
    
}