function MetadataService() {

    var title,
        description,
        defaultTitle = '%%DEFAULT_TITLE%%',
        defaultDescription = '%%DEFAULT_DESCRIPTION%%';

    this.setMetadata = function(metadata) {
        title = metadata.title ? metadata.title : defaultTitle;
        description = metadata.description ? metadata.description : defaultDescription;
    };

    this.getMetadata = function() {
        return {
            title: defaultTitle,
            description: defaultDescription
        };
    };
}


angular
    .module('app')
    .service('MetadataService', MetadataService);
