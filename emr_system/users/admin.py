from django.contrib import admin

from .models import Profile
from organization.models import Organization, Department

admin.site.site_header = 'Site administration EMR'


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['department']


class OrganizationAdmin(admin.ModelAdmin):
    list_display = [
        'long_name',
        'short_name',
        'address',
        'phone_number',
        'email',
#        'department',
    ]


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Organization, OrganizationAdmin)

# class UserAdmin(admin.ModelAdmin):
#     list_display = (
#         'username',
#         'first_name',
#         'last_name',
#         'email',
#         'role',
#         'bio'
#     )
#     list_editable = ('role',)
#     list_filter = ('role',)
#     search_fields = ('username',)
#     empty_value_display = '-empty-'


# class TitleAdmin(admin.ModelAdmin):
#     list_display = (
#         'name',
#         'year',
#         'category',
#         'description'
#     )
#     empty_value_display = 'no value'
#     search_fields = ('name',)
#     list_filter = ('category',)
#     empty_value_display = '-empty-'
#
#
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = (
#         'pk',
#         'name',
#         'slug'
#     )
#     empty_value_display = 'no value'
#     list_filter = ('name',)
#     search_fields = ('name',)
#     prepopulated_fields = {'slug': ('name',)}
#
#
# class GenreAdmin(admin.ModelAdmin):
#     list_display = (
#         'pk',
#         'name',
#         'slug'
#     )
#     empty_value_display = 'no value'
#     list_filter = ('name',)
#     search_fields = ('name',)
#     prepopulated_fields = {'slug': ('name',)}
#
#
# class ReviewAdmin(admin.ModelAdmin):
#     class ReviewAdmin(admin.ModelAdmin):
#         list_display = (
#             'pk',
#             'author',
#             'text',
#             'score',
#             'pub_date',
#             'title'
#         )
#         empty_value_display = 'no value'
#         list_filter = ('author', 'score', 'pub_date')
#         search_fields = ('author',)
#
#
# class CommentAdmin(admin.ModelAdmin):
#     list_display = (
#         'pk',
#         'author',
#         'text',
#         'pub_date',
#         'review'
#     )
#     empty_value_display = 'no value'
#     list_filter = ('author', 'pub_date')
#     search_fields = ('author',)


# admin.site.register(Profile, UserAdmin)
# admin.site.register(Title, TitleAdmin)
# admin.site.register(Category, CategoryAdmin)
# admin.site.register(Genre, GenreAdmin)
# admin.site.register(Review, ReviewAdmin)
# admin.site.register(Comment, CommentAdmin)
