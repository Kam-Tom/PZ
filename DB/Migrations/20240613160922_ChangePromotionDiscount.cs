using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class ChangePromotionDiscount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                schema: "DreamyGadget",
                table: "Promotions");

            migrationBuilder.AddColumn<decimal>(
                name: "NewNetto",
                schema: "DreamyGadget",
                table: "Promotions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewNetto",
                schema: "DreamyGadget",
                table: "Promotions");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                schema: "DreamyGadget",
                table: "Promotions",
                type: "decimal(3,1)",
                precision: 3,
                scale: 1,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
