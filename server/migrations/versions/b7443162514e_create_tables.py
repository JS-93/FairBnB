"""Create tables

Revision ID: b7443162514e
Revises: 
Create Date: 2023-10-15 16:44:20.513739

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7443162514e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rentals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rental_id', sa.Integer(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['rental_id'], ['rentals.id'], name=op.f('fk_bookings_rental_id_rentals')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bookings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rental_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['rental_id'], ['rentals.id'], name=op.f('fk_reviews_rental_id_rentals')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlist',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rental_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['rental_id'], ['rentals.id'], name=op.f('fk_wishlist_rental_id_rentals')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_wishlist_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'rental_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlist')
    op.drop_table('reviews')
    op.drop_table('bookings')
    op.drop_table('users')
    op.drop_table('rentals')
    # ### end Alembic commands ###