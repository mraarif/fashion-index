from mongoengine import Document, fields, EmbeddedDocument
from mongoengine.fields import StringField, IntField, ListField, EmbeddedDocumentField


class Image(EmbeddedDocument):
    url = StringField(required=True)
    path = StringField(required=True)
    checksum = StringField(required=True)


class Product(Document):
    product_id = IntField(required=True)
    product_title = StringField(required=True)
    price = IntField(required=True, null=True)
    brand = StringField(required=True, null=True)
    currency_code = StringField(required=True, null=True)
    discount = IntField(required=False, null=True)
    gender = StringField(required=True, null=True)
    url = fields.URLField(required=True)
    product_imgs_src = ListField(StringField(required=True, null=True))
    image_urls = ListField(StringField(required=True, null=True))
    images = ListField(EmbeddedDocumentField(Image))
    position = ListField(StringField(required=True, null=True))
    product_categories = ListField(StringField(required=True, null=True))
    product_categories_mapped = ListField(StringField(required=True, null=True))
    product_description = StringField(required=True, null=True)
    stock = IntField(required=True, null=True)
    source = StringField(required=True, null=True)

    meta = {'collection': 'garment_items'}
