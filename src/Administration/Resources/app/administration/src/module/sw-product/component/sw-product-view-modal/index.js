import template from './sw-product-view-modal.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-product-view-modal', {
    template,

    props: {
        product: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            domainId: null,
            domain: null
        };
    },

    computed: {
        criteria() {
            const criteria = new Criteria();
            const storeFrontVisibilites = this.product.visibilities.filter(visibility => { return visibility.salesChannel.typeId === Shopware.Defaults.storefrontSalesChannelTypeId; });

            storeFrontVisibilites.forEach(visibility => {
                criteria.addFilter(Criteria.equals('salesChannelId', visibility.salesChannelId));
            });

            return criteria;
        }
    },

    methods: {
        changeDomain(id, domain) {
            this.domainId = id;
            this.domain = domain;
        },

        openWindow() {
            window.open(this.domain.url + '/detail/' + this.product.id);
        },

        closeModal() {
            this.$emit('modal-close');
        }
    }
});
