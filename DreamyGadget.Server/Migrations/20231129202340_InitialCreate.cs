using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DreamyGadget.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "SBD_ST_PS10_4");

            migrationBuilder.CreateTable(
                name: "CATEGORIES",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    CATEGORYID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CATEGORYNAME = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    PARENTCATEGORYID = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523912", x => x.CATEGORYID);
                    table.ForeignKey(
                        name: "SYS_C00523913",
                        column: x => x.PARENTCATEGORYID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "CATEGORIES",
                        principalColumn: "CATEGORYID");
                });

            migrationBuilder.CreateTable(
                name: "CURRENCIES",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    CURRENCYCODE = table.Column<string>(type: "varchar(3)", unicode: false, maxLength: 3, nullable: false),
                    EXCHANGERATE = table.Column<decimal>(type: "DECIMAL(10,4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523911", x => x.CURRENCYCODE);
                });

            migrationBuilder.CreateTable(
                name: "PROMOTIONS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    PROMOTIONID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PROMOTIONNAME = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    DISCOUNTPERCENTAGE = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    STARTDATE = table.Column<DateTime>(type: "DATE", nullable: true),
                    ENDDATE = table.Column<DateTime>(type: "DATE", nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523928", x => x.PROMOTIONID);
                });

            migrationBuilder.CreateTable(
                name: "SHIPPINGMETHODS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    SHIPPINGMETHODID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    METHODNAME = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    SHIPPINGCOST = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523914", x => x.SHIPPINGMETHODID);
                });

            migrationBuilder.CreateTable(
                name: "USERS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    USERID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    USERNAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PASSWORD = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EMAIL = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    SHIPPINGADDRESS = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NEWSLETTERSUBSCRIPTION = table.Column<bool>(type: "bit", precision: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523915", x => x.USERID);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PRODUCTNAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PRICE = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: true),
                    STOCKQUANTITY = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CATEGORYID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    VATRATE = table.Column<decimal>(type: "DECIMAL(4,2)", nullable: true),
                    HIDDEN = table.Column<bool>(type: "bit", precision: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523916", x => x.PRODUCTID);
                    table.ForeignKey(
                        name: "PRODUCTS_FK1",
                        column: x => x.CATEGORYID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "CATEGORIES",
                        principalColumn: "CATEGORYID");
                });

            migrationBuilder.CreateTable(
                name: "ORDERS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    ORDERID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    USERID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ORDERDATE = table.Column<DateTime>(type: "datetime2(6)", precision: 6, nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    ORDERSTATUS = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523917", x => x.ORDERID);
                    table.ForeignKey(
                        name: "FK_USER_ORDERS",
                        column: x => x.USERID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "USERS",
                        principalColumn: "USERID");
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTFILES",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    FILEID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FILEPATH = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    FILEDESCRIPTION = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523926", x => x.FILEID);
                    table.ForeignKey(
                        name: "FK_PRODUCT_FILES_PRODUCTS",
                        column: x => x.PRODUCTID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PRODUCTS",
                        principalColumn: "PRODUCTID");
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTIMAGES",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    IMAGEID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IMAGEPATH = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    ISTHUMBNAIL = table.Column<bool>(type: "bit", precision: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523924", x => x.IMAGEID);
                    table.ForeignKey(
                        name: "FK_PRODUCT_IMAGES_PRODUCTS",
                        column: x => x.PRODUCTID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PRODUCTS",
                        principalColumn: "PRODUCTID");
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTPROMOTIONS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PROMOTIONID = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523929", x => new { x.PRODUCTID, x.PROMOTIONID });
                    table.ForeignKey(
                        name: "SYS_C00523930",
                        column: x => x.PRODUCTID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PRODUCTS",
                        principalColumn: "PRODUCTID");
                    table.ForeignKey(
                        name: "SYS_C00523931",
                        column: x => x.PROMOTIONID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PROMOTIONS",
                        principalColumn: "PROMOTIONID");
                });

            migrationBuilder.CreateTable(
                name: "REVIEWS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    REVIEWID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    USERID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RATING = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523932", x => x.REVIEWID);
                    table.ForeignKey(
                        name: "SYS_C00523933",
                        column: x => x.USERID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "USERS",
                        principalColumn: "USERID");
                    table.ForeignKey(
                        name: "SYS_C00523934",
                        column: x => x.PRODUCTID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PRODUCTS",
                        principalColumn: "PRODUCTID");
                });

            migrationBuilder.CreateTable(
                name: "ORDERITEMS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    ORDERITEMID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ORDERID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PRODUCTID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QUANTITY = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ITEMPRICE = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523919", x => x.ORDERITEMID);
                    table.ForeignKey(
                        name: "FK_ORDER_ITEMS_ORDERS",
                        column: x => x.ORDERID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "ORDERS",
                        principalColumn: "ORDERID");
                    table.ForeignKey(
                        name: "FK_ORDER_ITEMS_PRODUCTS",
                        column: x => x.PRODUCTID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "PRODUCTS",
                        principalColumn: "PRODUCTID");
                });

            migrationBuilder.CreateTable(
                name: "PAYMENTS",
                schema: "SBD_ST_PS10_4",
                columns: table => new
                {
                    PAYMENTID = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ORDERID = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PAYMENTMETHOD = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    PAYMENTSTATUS = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C00523922", x => x.PAYMENTID);
                    table.ForeignKey(
                        name: "FK_PAYMENTS_ORDERS",
                        column: x => x.ORDERID,
                        principalSchema: "SBD_ST_PS10_4",
                        principalTable: "ORDERS",
                        principalColumn: "ORDERID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CATEGORIES_PARENTCATEGORYID",
                schema: "SBD_ST_PS10_4",
                table: "CATEGORIES",
                column: "PARENTCATEGORYID");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERITEMS_ORDERID",
                schema: "SBD_ST_PS10_4",
                table: "ORDERITEMS",
                column: "ORDERID");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERITEMS_PRODUCTID",
                schema: "SBD_ST_PS10_4",
                table: "ORDERITEMS",
                column: "PRODUCTID");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERS_USERID",
                schema: "SBD_ST_PS10_4",
                table: "ORDERS",
                column: "USERID");

            migrationBuilder.CreateIndex(
                name: "IX_PAYMENTS_ORDERID",
                schema: "SBD_ST_PS10_4",
                table: "PAYMENTS",
                column: "ORDERID");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTFILES_PRODUCTID",
                schema: "SBD_ST_PS10_4",
                table: "PRODUCTFILES",
                column: "PRODUCTID");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIMAGES_PRODUCTID",
                schema: "SBD_ST_PS10_4",
                table: "PRODUCTIMAGES",
                column: "PRODUCTID");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTPROMOTIONS_PROMOTIONID",
                schema: "SBD_ST_PS10_4",
                table: "PRODUCTPROMOTIONS",
                column: "PROMOTIONID");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTS_CATEGORYID",
                schema: "SBD_ST_PS10_4",
                table: "PRODUCTS",
                column: "CATEGORYID");

            migrationBuilder.CreateIndex(
                name: "IX_REVIEWS_PRODUCTID",
                schema: "SBD_ST_PS10_4",
                table: "REVIEWS",
                column: "PRODUCTID");

            migrationBuilder.CreateIndex(
                name: "IX_REVIEWS_USERID",
                schema: "SBD_ST_PS10_4",
                table: "REVIEWS",
                column: "USERID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CURRENCIES",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "ORDERITEMS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PAYMENTS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PRODUCTFILES",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PRODUCTIMAGES",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PRODUCTPROMOTIONS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "REVIEWS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "SHIPPINGMETHODS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "ORDERS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PROMOTIONS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "PRODUCTS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "USERS",
                schema: "SBD_ST_PS10_4");

            migrationBuilder.DropTable(
                name: "CATEGORIES",
                schema: "SBD_ST_PS10_4");
        }
    }
}
