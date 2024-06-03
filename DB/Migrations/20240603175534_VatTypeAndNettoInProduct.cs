using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class VatTypeAndNettoInProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VAT",
                schema: "DreamyGadget",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Stock",
                schema: "DreamyGadget",
                table: "Products",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "Price",
                schema: "DreamyGadget",
                table: "Products",
                newName: "Netto");

            migrationBuilder.AddColumn<string>(
                name: "VatType",
                schema: "DreamyGadget",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VatType",
                schema: "DreamyGadget",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                schema: "DreamyGadget",
                table: "Products",
                newName: "Stock");

            migrationBuilder.RenameColumn(
                name: "Netto",
                schema: "DreamyGadget",
                table: "Products",
                newName: "Price");

            migrationBuilder.AddColumn<decimal>(
                name: "VAT",
                schema: "DreamyGadget",
                table: "Products",
                type: "decimal(3,1)",
                precision: 3,
                scale: 1,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
