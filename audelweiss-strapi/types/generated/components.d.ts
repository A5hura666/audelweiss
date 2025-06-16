import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsClassifiedLinks extends Struct.ComponentSchema {
  collectionName: 'components_components_classified_links';
  info: {
    displayName: 'ClassifiedLinks';
  };
  attributes: {
    Category: Schema.Attribute.String & Schema.Attribute.Required;
    pageLinks: Schema.Attribute.Component<'components.link', true> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsIconLink extends Struct.ComponentSchema {
  collectionName: 'components_components_icon_links';
  info: {
    description: '';
    displayName: 'icon-link';
  };
  attributes: {
    actionType: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    label: Schema.Attribute.String;
    megaMenu: Schema.Attribute.Component<'components.mega-menu', false>;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsMegaMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_mega_menus';
  info: {
    description: '';
    displayName: 'megaMenu';
  };
  attributes: {
    productLinks: Schema.Attribute.Component<'components.product-link', true> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsProductArticleCard extends Struct.ComponentSchema {
  collectionName: 'components_components_product_article_cards';
  info: {
    description: '';
    displayName: 'productArticleCard';
    icon: 'shirt';
  };
  attributes: {
    minProductPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    productCategory: Schema.Attribute.Enumeration<
      ['Scrunchy', 'Bandeaux', 'Accessoires', 'Sac/Bananes', 'Cuisine/Deco']
    > &
      Schema.Attribute.Required;
    productImages: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.Required;
    productLink: Schema.Attribute.Component<'components.link', false>;
    productMaxPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    productName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsProductLink extends Struct.ComponentSchema {
  collectionName: 'components_components_product_links';
  info: {
    description: '';
    displayName: 'ProductLink';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsProductPage extends Struct.ComponentSchema {
  collectionName: 'components_components_product_pages';
  info: {
    displayName: 'ProductPage';
  };
  attributes: {
    product_article: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-article-card.product-article-card'
    >;
    product_article_description: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-article-description.product-article-description'
    >;
  };
}

export interface LayoutBlogItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_blog_items';
  info: {
    description: '';
    displayName: 'blogPreviewItem';
  };
  attributes: {
    ArticleCategory: Schema.Attribute.Enumeration<
      ['Infos', 'Conseils', 'Id\u00E9es cadeaux']
    > &
      Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    linkToArticle: Schema.Attribute.Component<'components.link', false> &
      Schema.Attribute.Required;
    readingTime: Schema.Attribute.Integer;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutBlogList extends Struct.ComponentSchema {
  collectionName: 'components_layout_blog_lists';
  info: {
    displayName: 'BlogList';
  };
  attributes: {
    blogs: Schema.Attribute.Component<'layout.blog-item', true>;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutCategoryHighlight extends Struct.ComponentSchema {
  collectionName: 'components_layout_category_highlights';
  info: {
    displayName: 'CategoryHighlight';
  };
  attributes: {
    Categories: Schema.Attribute.Component<'components.link', true> &
      Schema.Attribute.Required;
    Images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'footer';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    pageLinks: Schema.Attribute.Component<'components.classified-links', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    socialLinks: Schema.Attribute.Component<'components.icon-link', true>;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'header';
  };
  attributes: {
    iconsLinks: Schema.Attribute.Component<'components.icon-link', true>;
    links: Schema.Attribute.Component<'components.link', true> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    callToAction: Schema.Attribute.Component<'components.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.classified-links': ComponentsClassifiedLinks;
      'components.icon-link': ComponentsIconLink;
      'components.link': ComponentsLink;
      'components.mega-menu': ComponentsMegaMenu;
      'components.product-article-card': ComponentsProductArticleCard;
      'components.product-article-card': ComponentsProductArticleCard;
      'components.product-link': ComponentsProductLink;
      'components.product-page': ComponentsProductPage;
      'layout.blog-item': LayoutBlogItem;
      'layout.blog-list': LayoutBlogList;
      'layout.category-highlight': LayoutCategoryHighlight;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero': LayoutHero;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
