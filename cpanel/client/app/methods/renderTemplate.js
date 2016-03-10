renderTemplate = function (template, data) {
    var node = document.createElement("div");
    document.body.appendChild(node);
    var instance = Blaze.renderWithData(template, data, node);

    return {
        instance: instance,
        html: node
    };
};