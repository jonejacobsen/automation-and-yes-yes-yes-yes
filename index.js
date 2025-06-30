```javascript
const zapier = require('zapier-platform-core');

const ShopifyTrigger = require('./triggers/shopify');
const HelpdeskCreate = require('./creates/helpdesk');
const SlackNotification = require('./creates/slack');
const InventoryCheck = require('./creates/inventory');
const LowStockAlert = require('./creates/low_stock_alert');
const ThankYouEmail = require('./creates/thank_you_email');
const VIPSegmentAdd = require('./creates/vip_segment_add');
const FollowUpTaskCreate = require('./creates/follow_up_task');

const App = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  
  authentication: {
    type: 'custom',
    fields: [
      {key: 'api_key', type: 'string', required: true}
    ],
    test: (z, bundle) => {
      const promise = z.request({
        url: 'https://api.production.company.com',
        params: {
          api_key: bundle.authData.api_key
        }
      });
      return promise.then((response) => {
        if (response.status !== 200) {
          throw new Error('Invalid API Key');
        }
      });
    }
  },
  
  triggers: {
    new_order: ShopifyTrigger
  },
  
  creates: {
    create_ticket: HelpdeskCreate,
    send_slack_notification: SlackNotification,
    check_inventory: InventoryCheck,
    send_low_stock_alert: LowStockAlert,
    send_thank_you_email: ThankYouEmail,
    add_to_vip_segment: VIPSegmentAdd,
    create_follow_up_task: FollowUpTaskCreate
  },
  
  resources: {},
  
  search: {},
  
  beforeRequest: [
    (request, z, bundle) => {
      request.headers = request.headers || {};
      request.headers['X-API-Key'] = bundle.authData.api_key;
      return request;
    }
  ],
  
  afterResponse: [
    (response, z, bundle) => {
      if (response.status === 401) {
        throw new Error('The API Key you supplied is invalid');
      }
      return response;
    }
  ],
  
  beforeMiddlewares: [],
  
  afterMiddlewares: [],
  
  errorMiddlewares: [],
  
  skipHttpMiddlewares: false
};

module.exports = App;
```

Please note that the actual implementation of the triggers and creates (ShopifyTrigger, HelpdeskCreate, SlackNotification, InventoryCheck, LowStockAlert, ThankYouEmail, VIPSegmentAdd, FollowUpTaskCreate) are not included in this code. They should be implemented in their respective files (e.g., './triggers/shopify.js', './creates/helpdesk.js', etc.) and required at the top of the index.js file.