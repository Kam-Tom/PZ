using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class userPromotion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProdDatePromotion",
                schema: "DreamyGadget",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProdPromotion",
                schema: "DreamyGadget",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProdValuePromotion",
                schema: "DreamyGadget",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProdDatePromotion",
                schema: "DreamyGadget",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProdPromotion",
                schema: "DreamyGadget",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProdValuePromotion",
                schema: "DreamyGadget",
                table: "Users");
        }
    }
}
