import logging
from fastjsonschema import (
    compile as compile_schema,
    JsonSchemaDefinitionException
    )

logger = logging.getLogger(__name__)


class ValidationError(Exception):
    pass


def data_url_format_checker(value):
    # Здесь вы можете добавить свою логику проверки формата data-url
    return True


FORMATS = {
    'data-url': data_url_format_checker,
    # Добавьте здесь другие форматы, которые вы хотите поддерживать
}


def compile_with_custom_formats(schema):
    try:
        return compile_schema(schema, formats=FORMATS)
    except JsonSchemaDefinitionException as e:
        logger.error(f"Validation error: {e}")
        raise ValidationError({"findings": str(e)})