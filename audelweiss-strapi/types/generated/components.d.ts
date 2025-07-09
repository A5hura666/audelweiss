import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsCategoryCard extends Struct.ComponentSchema {
  collectionName: 'components_components_category_cards';
  info: {
    displayName: 'category-card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsClassifiedLinks extends Struct.ComponentSchema {
  collectionName: 'components_components_classified_links';
  info: {
    description: '';
    displayName: 'ClassifiedLinks';
  };
  attributes: {
    Category: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'components.link', true> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_components_feature_items';
  info: {
    description: '';
    displayName: 'usp-item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    position: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    MegaMenu: Schema.Attribute.Component<'components.mega-menu', true>;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsMegaMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_mega_menus';
  info: {
    description: '';
    displayName: 'megaMenuItem';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    productLinks: Schema.Attribute.Component<'components.product-link', true> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsProductArticleCard extends Struct.ComponentSchema {
  collectionName: 'components_components_product_article_cards';
  info: {
    description: '';
    displayName: 'productArticleCard';
  };
  attributes: {
    product_article: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-article-card.product-article-card'
    >;
  };
}

export interface ComponentsProductFilters extends Struct.ComponentSchema {
  collectionName: 'components_components_product_filters';
  info: {
    description: '';
    displayName: 'productFilters';
  };
  attributes: {
    colorFilter: Schema.Attribute.Component<'layout.colors-filter', true>;
    productFilter: Schema.Attribute.Component<'layout.product-filter', true>;
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
    description: '';
    displayName: 'ProductPage';
  };
  attributes: {
    product_article: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-article-card.product-article-card'
    >;
  };
}

export interface ComponentsProductrticleDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_components_productrticle_descriptions';
  info: {
    description: '';
    displayName: 'productArticleDescription';
  };
  attributes: {
    product_article_description: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-article-description.product-article-description'
    >;
    productComment: Schema.Attribute.Component<'layout.product-comment', true>;
    productFilters: Schema.Attribute.Component<
      'components.product-filters',
      true
    >;
  };
}

export interface LayoutBlogArticle extends Struct.ComponentSchema {
  collectionName: 'components_layout_blog_articles';
  info: {
    description: '';
    displayName: 'BlogArticle';
  };
  attributes: {
    ArticleCategory: Schema.Attribute.Enumeration<
      ['Infos', 'Id\u00E9es Cadeaux', 'Conseils']
    >;
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Schema.Attribute.Text;
    introduction: Schema.Attribute.Text;
    paragraphes: Schema.Attribute.Component<
      'layout.contenu-article-blog',
      true
    >;
    title: Schema.Attribute.String;
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
    linkToArticle: Schema.Attribute.Component<'components.link', false>;
    readingTime: Schema.Attribute.Integer;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutBlogList extends Struct.ComponentSchema {
  collectionName: 'components_layout_blog_lists';
  info: {
    description: '';
    displayName: 'BlogList';
  };
  attributes: {
    blogs: Schema.Attribute.Component<'layout.blog-item', true>;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutCategoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_categories_sections';
  info: {
    displayName: 'categories-section';
  };
  attributes: {
    categories: Schema.Attribute.Component<'components.category-card', true>;
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

export interface LayoutColorsFilter extends Struct.ComponentSchema {
  collectionName: 'components_layout_colors_filters';
  info: {
    description: '';
    displayName: 'colorsFilters';
  };
  attributes: {
    product_color: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-color.product-color'
    >;
  };
}

export interface LayoutContenuArticleBlog extends Struct.ComponentSchema {
  collectionName: 'components_layout_contenu_article_blogs';
  info: {
    description: '';
    displayName: 'ContenuArticleBlog';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
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

export interface LayoutMegaMenu extends Struct.ComponentSchema {
  collectionName: 'components_layout_mega_menus';
  info: {
    displayName: 'MegaMenu';
  };
  attributes: {
    MegaMenuItems: Schema.Attribute.Component<'components.mega-menu', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface LayoutProductComment extends Struct.ComponentSchema {
  collectionName: 'components_layout_product_comments';
  info: {
    displayName: 'productComment';
  };
  attributes: {
    product_comment: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-comment.product-comment'
    >;
  };
}

export interface LayoutProductFilter extends Struct.ComponentSchema {
  collectionName: 'components_layout_product_filters';
  info: {
    displayName: 'productFilter';
  };
  attributes: {
    product_filter: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-filter.product-filter'
    >;
  };
}

export interface LayoutProductsCarousel extends Struct.ComponentSchema {
  collectionName: 'components_layout_products_carousels';
  info: {
    displayName: 'products-carousel';
  };
  attributes: {
    description: Schema.Attribute.Text;
    product_articles: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-article-card.product-article-card'
    >;
    title: Schema.Attribute.String;
  };
}

export interface LayoutUspSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_usp_sections';
  info: {
    displayName: 'usp-section';
  };
  attributes: {
    items: Schema.Attribute.Component<'components.feature-item', true> &
      Schema.Attribute.Required;
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
      'components.category-card': ComponentsCategoryCard;
      'components.classified-links': ComponentsClassifiedLinks;
      'components.feature-item': ComponentsFeatureItem;
      'components.icon-link': ComponentsIconLink;
      'components.link': ComponentsLink;
      'components.mega-menu': ComponentsMegaMenu;
      'components.product-article-card': ComponentsProductArticleCard;
      'components.product-filters': ComponentsProductFilters;
      'components.product-link': ComponentsProductLink;
      'components.product-page': ComponentsProductPage;
      'components.productrticle-description': ComponentsProductrticleDescription;
      'layout.blog-article': LayoutBlogArticle;
      'layout.blog-item': LayoutBlogItem;
      'layout.blog-list': LayoutBlogList;
      'layout.categories-section': LayoutCategoriesSection;
      'layout.category-highlight': LayoutCategoryHighlight;
      'layout.colors-filter': LayoutColorsFilter;
      'layout.contenu-article-blog': LayoutContenuArticleBlog;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero': LayoutHero;
      'layout.mega-menu': LayoutMegaMenu;
      'layout.product-comment': LayoutProductComment;
      'layout.product-filter': LayoutProductFilter;
      'layout.products-carousel': LayoutProductsCarousel;
      'layout.usp-section': LayoutUspSection;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
